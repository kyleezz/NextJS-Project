'use client';

import React, {useEffect, useRef, useState} from 'react';
import {CommentsProvider, TComment} from '@udecode/plate-comments';
import { Plate } from '@udecode/plate-common';
import { ELEMENT_PARAGRAPH } from '@udecode/plate-paragraph';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { commentsUsers, myUserId } from '@/lib/plate/comments';
import { plugins } from '@/lib/plate/plate-plugins';
import { cn } from '@/lib/utils';
import { CommentsPopover } from '@/components/plate-ui/comments-popover';
import { Editor } from '@/components/plate-ui/editor';
import { FixedToolbar } from '@/components/plate-ui/fixed-toolbar';
import { FixedToolbarButtons } from '@/components/plate-ui/fixed-toolbar-buttons';
import { FloatingToolbar } from '@/components/plate-ui/floating-toolbar';
import { FloatingToolbarButtons } from '@/components/plate-ui/floating-toolbar-buttons';
import { MentionCombobox } from '@/components/plate-ui/mention-combobox';
import {useAtom} from "jotai/index";
import {
    answerAtoms, authorAtoms,
    commentsAtoms,
    editAnswer,
    editPrompt,
    pageNumber,
    promptsAtoms, removeComment,
    userAtoms,
    workingAtoms
} from "@/lib/atoms";
import {FixedToolbarButtonsReview} from "@/components/plate-ui/fixed-toolbar-buttons-review";
import {CursorOverlay} from "@udecode/plate-cursor";
import {string} from "zod";
import {CommentsPopoverReturned} from "@/components/plate-ui/comments-popover-returned";

// const countWords = content => {
//     let count = 0;
//     content.forEach(value => {
//         let s = value['children'][0]['text'];
//         if (s.length != 0 && s.match(/\b[-?(\w+)?]+\b/gi)) {
//             s = s.replace(/(^\s*)|(\s*$)/gi, "");
//             s = s.replace(/[ ]{2,}/gi, " ");
//             s = s.replace(/\n /, "\n");
//             count += s.split(' ').length;
//         }
//     });
//     return count;
// }
// function visitDescendants(obj) : number {
//     let word = 0
//
//     for (const [key, value] of Object.entries(obj)) {
//         if (value && typeof value === "object") {
//             // Recurse
//             word += visitDescendants(value);
//
//             if (value.comment != null) {
//                 console.log(value)
//             }
//         } else if (key === "text" && typeof value === "string") {
//             let s : string = value
//             if (s.length != 0 && s.match(/\b[-?(\w+)?]+\b/gi)) {
//                 s = s.replace(/(^\s*)|(\s*$)/gi, "");
//                 s = s.replace(/[ ]{2,}/gi, " ");
//                 s = s.replace(/\n /, "\n");
//                 word += s.split(' ').length;
//             }
//         }
//     }
//
//     return word
// }
export default function ReviewEditor({part, readOnly, returned = false}) {
    const containerRef = useRef(null);

    const [page, setPage] = useAtom(pageNumber)
    const [ans, setAns] = useAtom(answerAtoms)
    const [, updateAns] = useAtom(editAnswer)
    const [user, ] = useAtom(userAtoms)
    const [author, ] = useAtom(authorAtoms)
    const [comment, setComment] = useAtom(commentsAtoms)
    const [, editeComment] = useAtom(removeComment)

    // console.log(page)
    let timer = 0
    async function onSubmit(e) {
        updateAns(page, part, e)
    }


    if (!author.name || !user.name) return;

    const commentsUsers = {
        1: {
            id: '1',
            name: author.name,
            avatarUrl: author.image,
        },
        2: {
            id:  '2',
            name: user.name,
            avatarUrl: user.image,
        }
    };


    return (
        <div className="flex w-full">

        <DndProvider backend={HTML5Backend}>
            <CommentsProvider users={commentsUsers} myUserId={`${returned ? "2" : "1"}`} comments={comment[page-1][part-1]} onCommentAdd={(e) => {
                if (!e.id || !e || !e.userId) {
                    return;
                }

                const newComments = [...comment]

                const temp : TComment = {
                    id: e.id,
                    value: e.value,
                    userId: e.userId,
                    createdAt: e.createdAt,
                    parentId: e.parentId,
                    isResolved: e.isResolved
                }

                newComments[page-1][part-1][e.id] = temp;
                setComment(newComments)

            }} onCommentUpdate={(e) => {
                if (!e.id || !e.value) return;
                const newComments = [...comment]
                // newComments[page-1][part-1] = {}

                for (const key in comment[page-1][part-1]) {
                    // if (comment[page-1][part-1][key].parentId) {
                    //     if (comment[page-1][part-1][key].parentId != e.id) {
                    //         newComments[page-1][part-1][key] = comment[page-1][part-1][key]
                    //     }
                    // }
                    if (key === e.id) {
                        newComments[page - 1][part - 1][key].value = e.value
                    }
                }
                setComment(newComments)
            }} onCommentDelete={(e) => {

                editeComment(page, part, e)
            }}

            >
                <Plate plugins={plugins}
                       value={ans[page - 1][part - 1]} onChange={(e) => onSubmit(e)}
                       key={page}
                       readOnly={readOnly}
                >
                    <div
                        ref={containerRef}
                        className={cn(
                            // Block selection
                            '[&_.slate-start-area-left]:!w-[4px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
                        )}
                    >
                        <FixedToolbar>
                            <FixedToolbarButtonsReview/>
                        </FixedToolbar>

                        <Editor
                            className="px-[26px] py-3"
                            autoFocus
                            focusRing={false}
                            variant="ghost"
                            size="md"
                        />

                        <FloatingToolbar>
                            <FloatingToolbarButtons/>
                        </FloatingToolbar>

                        {
                            returned ? <CommentsPopoverReturned /> : <CommentsPopover />
                        }

                        <CursorOverlay containerRef={containerRef} />
                    </div>
                </Plate>
            </CommentsProvider>
        </DndProvider>
        </div>
    );
}