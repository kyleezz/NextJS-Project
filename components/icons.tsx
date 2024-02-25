import {
    AlertTriangle,
    ArrowRight,
    Check,
    ChevronLeft,
    ChevronRight,
    Command,
    CreditCard,
    File,
    FileText,
    HelpCircle,
    Image,
    Laptop,
    Loader2,
    LucideProps,
    Moon,
    MoreVertical,
    Pizza,
    Plus,
    Settings,
    SunMedium,
    Trash,
    Twitter,
    User,
    X,
    Send,
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Baseline,
    Bold,
    ChevronDown,
    ChevronsUpDown,
    Code2,
    Edit2,
    ExternalLink,
    Eye,
    FileCode,
    GripVertical,
    Heading1,
    Heading2,
    Heading3,
    Heading4,
    Heading5,
    Heading6,
    Indent,
    Italic,
    Keyboard,
    Link2,
    Link2Off,
    List,
    ListOrdered,
    MessageSquare,
    MessageSquarePlus,
    Minus,
    MoreHorizontal,
    Outdent,
    PaintBucket,
    Pilcrow,
    Quote,
    RectangleHorizontal,
    RectangleVertical,
    RotateCcw,
    Search,
    Smile,
    Strikethrough,
    Subscript,
    Superscript,
    Table,
    Text,
    Underline,
    WrapText, Film,
    RotateCcwIcon
} from "lucide-react"

import type { LucideIcon } from 'lucide-react';
import {cva} from "class-variance-authority";

export type Icon = LucideIcon;

const borderAll = (props: LucideProps) => (
    <svg
        viewBox="0 0 24 24"
        height="48"
        width="48"
        focusable="false"
        role="img"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6zm10 13h5a1 1 0 0 0 1-1v-5h-6v6zm-2-6H5v5a1 1 0 0 0 1 1h5v-6zm2-2h6V6a1 1 0 0 0-1-1h-5v6zm-2-6H6a1 1 0 0 0-1 1v5h6V5z" />
    </svg>
);

const borderBottom = (props: LucideProps) => (
    <svg
        viewBox="0 0 24 24"
        height="48"
        width="48"
        focusable="false"
        role="img"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M13 5a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2h2zm-8 6a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2zm-2 7a1 1 0 1 1 2 0 1 1 0 0 0 1 1h12a1 1 0 0 0 1-1 1 1 0 1 1 2 0 3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm17-8a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1zM7 4a1 1 0 0 0-1-1 3 3 0 0 0-3 3 1 1 0 0 0 2 0 1 1 0 0 1 1-1 1 1 0 0 0 1-1zm11-1a1 1 0 1 0 0 2 1 1 0 0 1 1 1 1 1 0 1 0 2 0 3 3 0 0 0-3-3z" />
    </svg>
);

const borderLeft = (props: LucideProps) => (
    <svg
        viewBox="0 0 24 24"
        height="48"
        width="48"
        focusable="false"
        role="img"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M6 21a1 1 0 1 0 0-2 1 1 0 0 1-1-1V6a1 1 0 0 1 1-1 1 1 0 0 0 0-2 3 3 0 0 0-3 3v12a3 3 0 0 0 3 3zm7-16a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2h2zm6 6a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2zm-5 9a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zm4-17a1 1 0 1 0 0 2 1 1 0 0 1 1 1 1 1 0 1 0 2 0 3 3 0 0 0-3-3zm-1 17a1 1 0 0 0 1 1 3 3 0 0 0 3-3 1 1 0 1 0-2 0 1 1 0 0 1-1 1 1 1 0 0 0-1 1z" />
    </svg>
);

const borderNone = (props: LucideProps) => (
    <svg
        viewBox="0 0 24 24"
        height="48"
        width="48"
        focusable="false"
        role="img"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M14 4a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zm-9 7a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2zm14 0a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2zm-6 10a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2h2zM7 4a1 1 0 0 0-1-1 3 3 0 0 0-3 3 1 1 0 0 0 2 0 1 1 0 0 1 1-1 1 1 0 0 0 1-1zm11-1a1 1 0 1 0 0 2 1 1 0 0 1 1 1 1 1 0 1 0 2 0 3 3 0 0 0-3-3zM7 20a1 1 0 0 1-1 1 3 3 0 0 1-3-3 1 1 0 1 1 2 0 1 1 0 0 0 1 1 1 1 0 0 1 1 1zm11 1a1 1 0 1 1 0-2 1 1 0 0 0 1-1 1 1 0 1 1 2 0 3 3 0 0 1-3 3z" />
    </svg>
);

const borderRight = (props: LucideProps) => (
    <svg
        viewBox="0 0 24 24"
        height="48"
        width="48"
        focusable="false"
        role="img"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M13 5a1 1 0 1 0 0-2h-2a1 1 0 1 0 0 2h2zm-8 6a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2zm9 9a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zM6 3a1 1 0 0 1 0 2 1 1 0 0 0-1 1 1 1 0 0 1-2 0 3 3 0 0 1 3-3zm1 17a1 1 0 0 1-1 1 3 3 0 0 1-3-3 1 1 0 1 1 2 0 1 1 0 0 0 1 1 1 1 0 0 1 1 1zm11 1a1 1 0 1 1 0-2 1 1 0 0 0 1-1V6a1 1 0 0 0-1-1 1 1 0 1 1 0-2 3 3 0 0 1 3 3v12a3 3 0 0 1-3 3z" />
    </svg>
);

const borderTop = (props: LucideProps) => (
    <svg
        viewBox="0 0 24 24"
        height="48"
        width="48"
        focusable="false"
        role="img"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M3 6a1 1 0 0 0 2 0 1 1 0 0 1 1-1h12a1 1 0 0 1 1 1 1 1 0 1 0 2 0 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3zm2 5a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2zm14 0a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2zm-5 9a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1zm-8 1a1 1 0 1 0 0-2 1 1 0 0 1-1-1 1 1 0 1 0-2 0 3 3 0 0 0 3 3zm11-1a1 1 0 0 0 1 1 3 3 0 0 0 3-3 1 1 0 1 0-2 0 1 1 0 0 1-1 1 1 1 0 0 0-1 1z" />
    </svg>
);

export const LucideOnlyIcons = {
    logo: Command,
    close: X,
    spinner: Loader2,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    trash: Trash,
    post: FileText,
    page: File,
    media: Image,
    settings: Settings,
    billing: CreditCard,
    ellipsis: MoreVertical,
    add: Plus,
    warning: AlertTriangle,
    user: User,
    arrowRight: ArrowRight,
    help: HelpCircle,
    pizza: Pizza,
    sun: SunMedium,
    moon: Moon,
    laptop: Laptop,
    publish: Send,
    alignCenter: AlignCenter,
    alignJustify: AlignJustify,
    alignLeft: AlignLeft,
    alignRight: AlignRight,
    arrowDown: ChevronDown,
    bg: PaintBucket,
    blockquote: Quote,
    bold: Bold,
    check: Check,
    chevronsUpDown: ChevronsUpDown,
    clear: X,
    code: Code2,
    codeblock: FileCode,
    color: Baseline,
    column: RectangleVertical,
    comment: MessageSquare,
    commentAdd: MessageSquarePlus,
    delete: Trash,
    dragHandle: GripVertical,
    editing: Edit2,
    emoji: Smile,
    externalLink: ExternalLink,
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    h4: Heading4,
    h5: Heading5,
    h6: Heading6,
    image: Image,
    indent: Indent,
    italic: Italic,
    kbd: Keyboard,
    lineHeight: WrapText,
    link: Link2,
    minus: Minus,
    more: MoreHorizontal,
    ol: ListOrdered,
    outdent: Outdent,
    paragraph: Pilcrow,
    refresh: RotateCcw,
    row: RectangleHorizontal,
    search: Search,
    strikethrough: Strikethrough,
    subscript: Subscript,
    superscript: Superscript,
    table: Table,
    text: Text,
    ul: List,
    underline: Underline,
    unlink: Link2Off,
    viewing: Eye,
    twitter: Twitter,
}
export const Icons = {
    rotateccw: RotateCcw,
    logo: Command,
    close: X,
    spinner: Loader2,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    trash: Trash,
    post: FileText,
    page: File,
    media: Image,
    settings: Settings,
    billing: CreditCard,
    ellipsis: MoreVertical,
    add: Plus,
    warning: AlertTriangle,
    user: User,
    arrowRight: ArrowRight,
    help: HelpCircle,
    pizza: Pizza,
    sun: SunMedium,
    moon: Moon,
    laptop: Laptop,
    publish: Send,
    alignCenter: AlignCenter,
    alignJustify: AlignJustify,
    alignLeft: AlignLeft,
    alignRight: AlignRight,
    arrowDown: ChevronDown,
    bg: PaintBucket,
    blockquote: Quote,
    bold: Bold,
    borderAll,
    borderBottom,
    borderLeft,
    borderNone,
    borderRight,
    borderTop,
    check: Check,
    chevronsUpDown: ChevronsUpDown,
    clear: X,
    code: Code2,
    codeblock: FileCode,
    color: Baseline,
    column: RectangleVertical,
    comment: MessageSquare,
    commentAdd: MessageSquarePlus,
    delete: Trash,
    dragHandle: GripVertical,
    editing: Edit2,
    emoji: Smile,
    externalLink: ExternalLink,
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    h4: Heading4,
    h5: Heading5,
    h6: Heading6,
    image: Image,
    indent: Indent,
    italic: Italic,
    kbd: Keyboard,
    lineHeight: WrapText,
    link: Link2,
    minus: Minus,
    more: MoreHorizontal,
    ol: ListOrdered,
    outdent: Outdent,
    paragraph: Pilcrow,
    refresh: RotateCcw,
    row: RectangleHorizontal,
    search: Search,
    strikethrough: Strikethrough,
    subscript: Subscript,
    superscript: Superscript,
    table: Table,
    text: Text,
    ul: List,
    underline: Underline,
    unlink: Link2Off,
    viewing: Eye,
    hr: Minus,
    embed: Film,
    gantt: ({ ...props }: LucideProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-gantt-chart-square" {...props}><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 8h7"/><path d="M8 12h6"/><path d="M11 16h5"/></svg>
    ),
    google: ({ ...props }: LucideProps) => (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16" {...props}>

            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
        </svg>
    ),
    twitter: Twitter,
}

export const iconVariants = cva('', {
    variants: {
        variant: {
            toolbar: 'h-5 w-5',
            menuItem: 'mr-2 h-5 w-5',
        },
        size: {
            sm: 'mr-2 h-4 w-4',
            md: 'mr-2 h-6 w-6',
        },
    },
    defaultVariants: {},
});