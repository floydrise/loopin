import {createFileRoute} from '@tanstack/react-router'


export const Route = createFileRoute('/')({
    component: App,
})

function App() {

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            Hello from main page
        </div>
    )
}
