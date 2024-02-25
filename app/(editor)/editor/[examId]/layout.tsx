interface EditorProps {
  children?: React.ReactNode

}
export const dynamic = 'force-dynamic'
export const revalidate = 1;
export default function EditorLayout({ children }: EditorProps) {

  return (

      <div className="h-screen">

          {children}
      </div>
  )
}
