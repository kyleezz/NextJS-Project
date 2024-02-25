"use client"

import {Editor} from "@tinymce/tinymce-react";
import React from "react";
import * as z from "zod";
import {postPatchSchema} from "@/lib/validations/post";
import {useAtom} from "jotai";
import {pageNumber} from "@/lib/atoms";
import PlateEditor from "@/components/plate-editor";

type FormData = z.infer<typeof postPatchSchema>
export default function ExamPrompt({prompts}) {
    //
    const [page, setPage] = useAtom(pageNumber)

    const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        setHydrated(true);
        // setPrompt(allPrompts[page - 1])
    }, []);

    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    return (
        <>
            {/*<Editor*/}
            {/*    // onInit={(evt, editor) => editorRef.current = editor}*/}
            {/*    id={"editor1"}*/}
            {/*    tinymceScriptSrc={"/tinymce/tinymce.min.js"}*/}
            {/*    initialValue={prompts[page - 1]}*/}
            {/*    disabled={true}*/}
            {/*    init={{*/}
            {/*        resize: false,*/}
            {/*        branding: false,*/}
            {/*        min_height: 400,*/}
            {/*        width: '100%',*/}
            {/*        readonly: true,*/}
            {/*        menubar: false,*/}
            {/*        plugins:*/}
            {/*            "autoresize preview searchreplace autolink directionality visualblocks visualchars fullscreen image media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists",*/}
            {/*        toolbar: false,*/}
            {/*        image_advtab: true,*/}
            {/*        promotion: false,*/}
            {/*        browser_spellcheck: true,*/}
            {/*        contextmenu: "useBrowserSpellcheck table backcolor",*/}
            {/*        setup: function (editor) {*/}
            {/*            editor.ui.registry.addMenuItem("useBrowserSpellcheck", {*/}
            {/*                text: "Use `Ctrl+Right click` to access spellchecker",*/}
            {/*                onAction: function () {*/}
            {/*                    editor.notificationManager.open({*/}
            {/*                        text:*/}
            {/*                            "To access the spellchecker, hold the Control (Ctrl) key and right-click on the misspelt word.",*/}
            {/*                        type: "info",*/}
            {/*                        timeout: 5000,*/}
            {/*                        closeButton: true,*/}
            {/*                    });*/}
            {/*                },*/}
            {/*            });*/}
            {/*            editor.ui.registry.addContextMenu("useBrowserSpellcheck", {*/}
            {/*                update: function (node) {*/}
            {/*                    return editor.selection.isCollapsed() ? ["useBrowserSpellcheck"] : [];*/}
            {/*                },*/}
            {/*            });*/}
            {/*        },*/}
            {/*    }}*/}
            {/*/>*/}
            <div className="max-w-[1336px] rounded-lg border bg-background shadow min-h-[40%]">
                <PlateEditor readOnly={true}/>
            </div>
        </>

    )
}