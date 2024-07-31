import { auth, firestore } from './firebase-config'
import { collection, query } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'

import Header from './header'

const DataDisplay = (props) => {
    const [user, loading] = useAuthState(auth)

    const [value, dataLoading] = useCollection(
        user &&
            query(collection(firestore, `/users/${user.uid}/courses`), {
                snapshotListenOptions: {
                    includeMetadataChanges: true,
                },
            })
    )

    const [assignments, assignmentsLoading] = useCollection(
        user &&
            query(collection(firestore, `/users/${user.uid}/assignments`), {
                snapshotListenOptions: {
                    includeMetadataChanges: true,
                },
            })
    )

    if (loading || dataLoading || assignmentsLoading) {
        return (
            <>
                <Header />
                <div className="bg-primary-600 flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
                    <h1>Loading...</h1>
                </div>
            </>
        )
    }
    if (user && value && assignments) {
        return (
            <>
                <Header />
                <div className="bg-primary-600 px-6 py-8 h-full lg:py-0">
                    <props.display
                        user={user}
                        courses={value.docs.map((item) => item.data())}
                        assignments={assignments.docs.map((item) =>
                            item.data()
                        )}
                    />
                </div>
            </>
        )
    }
    return (
        <>
            <Header />
            <div className="h-screen bg-primary-600 flex flex-col items-center justify-center px-6 py-8 lg:py-0">
                <h1> Login to add courses </h1>
            </div>
        </>
    )
}

export default DataDisplay
