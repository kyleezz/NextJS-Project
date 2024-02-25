"use client"

import {Editor} from "@tinymce/tinymce-react";
import React, {useState} from "react";
import * as z from "zod";
import {postPatchSchema} from "@/lib/validations/post";
import {useAtom} from "jotai";
import {editPrompt, pageNumber, promptsAtoms} from "@/lib/atoms";
import PlateEditor from "@/components/plate-editor";

type FormData = z.infer<typeof postPatchSchema>
export default function EditorPrompt({examId}) {
    //
    const [page, setPage] = useAtom(pageNumber)
    const [allPrompts, setAllPrompts] = useAtom(promptsAtoms)
    const [prompt, setPrompt] = useState("")
    const [, setAtomPrompt] = useAtom(editPrompt)

    // console.log(page)
    let timer = 0
    async function onSubmit(e) {
        // console.log(e)
        setAtomPrompt(page, e)
    }

    const [hydrated, setHydrated] = React.useState(false);
    React.useEffect(() => {
        setHydrated(true);
        // setPrompt(allPrompts[page - 1])
    }, []);

    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    console.log(allPrompts[page - 1])

    return (
        <> {
            prompt != null ?
                // <Editor
                //     // onInit={(evt, editor) => editorRef.current = editor}
                //     id={"editor1"}
                //     tinymceScriptSrc={"/tinymce/tinymce.min.js"}
                //     value={allPrompts[page - 1]}
                //     onEditorChange={(e) => onSubmit(e)}
                //     init={{
                //         resize: false,
                //         branding: false,
                //         min_height: 400,
                //         width: '100%',
                //         toolbar_mode: "wrap",
                //         menu: {
                //             edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
                //             insert: { title: 'Insert', items: 'image link media inserttable | charmap emoticons hr | pagebreak tableofcontents' },
                //             format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat' },
                //             table: { title: 'Table', items: 'inserttable | cell row column | advtablesort | tableprops deletetable' },
                //             help: { title: 'Help', items: 'help' }
                //         },
                //         menubar: 'edit insert format table',
                //         plugins:
                //             "autoresize preview searchreplace autolink directionality visualblocks visualchars fullscreen image media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount",
                //         autoresize_bottom_margin: 0,
                //         toolbar:
                //             " blocks | bold italic underline strikethrough | forecolor backcolor blockquote | image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | removeformat",
                //         image_advtab: true,
                //         promotion: false,
                //         browser_spellcheck: true,
                //         contextmenu: "useBrowserSpellcheck table backcolor",
                //         setup: function (editor) {
                //             editor.ui.registry.addMenuItem("useBrowserSpellcheck", {
                //                 text: "Use `Ctrl+Right click` to access spellchecker",
                //                 onAction: function () {
                //                     editor.notificationManager.open({
                //                         text:
                //                             "To access the spellchecker, hold the Control (Ctrl) key and right-click on the misspelt word.",
                //                         type: "info",
                //                         timeout: 5000,
                //                         closeButton: true,
                //                     });
                //                 },
                //             });
                //             editor.ui.registry.addContextMenu("useBrowserSpellcheck", {
                //                 update: function (node) {
                //                     return editor.selection.isCollapsed() ? ["useBrowserSpellcheck"] : [];
                //                 },
                //             });
                //         },
                //     }}
                // />
                <div className="max-w-[1336px] rounded-lg border bg-background shadow min-h-[40%]">
                    <PlateEditor />
                </div>

                : null}
        </>

    )
}