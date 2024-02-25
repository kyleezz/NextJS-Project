import {Editor} from "@tinymce/tinymce-react";
import React from "react";
import {plugins} from "@/lib/plate/plate-plugins";
import {cn} from "@/lib/utils";
import {FixedToolbar} from "@/components/plate-ui/fixed-toolbar";
import {FixedToolbarButtons} from "@/components/plate-ui/fixed-toolbar-buttons";
import {FloatingToolbar} from "@/components/plate-ui/floating-toolbar";
import {FloatingToolbarButtons} from "@/components/plate-ui/floating-toolbar-buttons";
import {CommentsPopover} from "@/components/plate-ui/comments-popover";
import { Plate } from "@udecode/plate-common";
import PlateEditor from "@/components/plate-editor";
import PlateDecorativeEditor from "@/components/plate-decorative-editor";

export default function DecorativeAnswer() {
    return (
        <div className="max-w-[1336px] rounded-lg border bg-background shadow min-h-[250px] pointer-events-none">
            <PlateDecorativeEditor readOnly={true}/>
        </div>
    )
}