import {Editor} from "@tinymce/tinymce-react";
import React from "react";
import {useAtom} from "jotai/index";
import {answerAtoms, editAnswer, pageNumber, workingAtoms} from "@/lib/atoms";
import PlateEditor from "@/components/plate-editor";
import AnswerEditor from "@/components/answer-editor";

export default function ExamAnswer({part}) {

    let timer = 0
    const [work, setWork] = useAtom(workingAtoms)

    // const [page, setPage] = useAtom(pageNumber)
    // const [ans, setAns] = useAtom(answerAtoms)
    // const [, updateAns] = useAtom(editAnswer)
    // const [work, setWork] = useAtom(workingAtoms)

    // const [answer, setAnswer] = useState<string>(initialValue);
    // const [work, setWork] = useState<boolean>(working);
    //
    // useEffect(() => {
    //     setAnswer(initialValue);
    // }, [initialValue]);
    //
    // useEffect(() => {
    //     setWork(working);
    // }, [working]);

    // async function onSubmit(e) {
    //
    //     updateAns(page, part, e)
    //
    // }

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
        <div className={work ? "max-w-[1336px] rounded-lg border bg-background shadow min-h-[250px]" :
            "max-w-[1336px] rounded-lg border bg-background shadow min-h-[250px] pointer-events-none"}>
            <AnswerEditor part={part}/>
        </div>

        // <Editor
        //     tinymceScriptSrc={"/tinymce/tinymce.min.js"}
        //     value={ans[page - 1][part - 1]}
        //     onEditorChange={(e) => onSubmit(e)}
        //     disabled={!work}
        //     init={{
        //         resize: false,
        //         branding: false,
        //         min_height: 300,
        //         width: '100%',
        //         toolbar_mode: "wrap",
        //         menu: {
        //             edit: {title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace'},
        //             insert: {title: 'Insert', items: 'inserttable | charmap emoticons hr | pagebreak tableofcontents'},
        //             format: {
        //                 title: 'Format',
        //                 items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat'
        //             },
        //             table: {
        //                 title: 'Table',
        //                 items: 'inserttable | cell row column | advtablesort | tableprops deletetable'
        //             },
        //             help: {title: 'Help', items: 'help'}
        //         },
        //         menubar: 'edit insert format table',
        //         plugins:
        //             "autoresize preview searchreplace autolink directionality visualblocks visualchars fullscreen image media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount",
        //         autoresize_bottom_margin: 0,
        //         toolbar:
        //             " blocks | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent",
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
        //     // onChange={this.onChange}
        // />
    )
}