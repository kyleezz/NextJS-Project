function NavPane({children}) {
    return (
        <div className={"sticky text-xl top-11 z-10 bg-neutral-200 text-white flex items-start gap-4 justify-start p-2 px-8 pt-3 flex-wrap flex-row overflow-x-auto align-center"}>
            {children}
        </div>
    )
}

export default  NavPane;