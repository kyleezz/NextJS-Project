'use client';

import React, {useEffect, useRef, useState} from 'react';
import { CommentsProvider } from '@udecode/plate-comments';
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
import {answerAtoms, editAnswer, editPrompt, endedAtoms, pageNumber, promptsAtoms, workingAtoms} from "@/lib/atoms";

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

function visitDescendants(obj) : number {
    let word = 0

    for (const [key, value] of Object.entries(obj)) {
        if (value && typeof value === "object") {
            // Recurse
            word += visitDescendants(value);
        } else if (key === "text" && typeof value === "string") {
            let s : string = value
            if (s.length != 0 && s.match(/\b[-?(\w+)?]+\b/gi)) {
                s = s.replace(/(^\s*)|(\s*$)/gi, "");
                s = s.replace(/[ ]{2,}/gi, " ");
                s = s.replace(/\n /, "\n");
                word += s.split(' ').length;
            }
        }
    }

    return word
}
export default function AnswerEditor({part}) {
    // const containerRef = useRef(null);

    const [page, setPage] = useAtom(pageNumber)
    const [ans, setAns] = useAtom(answerAtoms)
    const [, updateAns] = useAtom(editAnswer)
    const [ended, ] = useAtom(endedAtoms)

    // console.log(page)
    let timer = 0
    async function onSubmit(e) {
        updateAns(page, part, e)
    }


    return (
        <DndProvider backend={HTML5Backend}>
            <CommentsProvider users={commentsUsers} myUserId={myUserId}>
                <Plate plugins={plugins}
                       value={ans[page - 1][part - 1]} onChange={(e) => onSubmit(e)}
                       key={page}
                       readOnly={ended}
                >
                    <div
                        // ref={containerRef}
                        className={cn(
                            // Block selection
                            '[&_.slate-start-area-left]:!w-[4px] [&_.slate-start-area-right]:!w-[64px] [&_.slate-start-area-top]:!h-4'
                        )}
                    >
                        <FixedToolbar>
                            <FixedToolbarButtons/>
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

                        <CommentsPopover/>

                        {/*<CursorOverlay containerRef={containerRef} />*/}
                    </div>
                </Plate>
            </CommentsProvider>
        </DndProvider>
    );
}