import React, { useContext } from 'react'
import FlipMove from 'react-flip-move'
import firebase from 'firebase'

import { useCollection } from 'react-firebase-hooks/firestore'
import { observer } from 'mobx-react'
import { UserContext } from '../providers/UserProvider'

import Topic from './Topic'

const UserHomepage = () => {
  const user = useContext(UserContext)

  const [docs, loading, error] = useCollection(
    firebase.firestore().collection('users/' + user.uid + '/topics'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  )

  const { photoURL, displayName, email } = user

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        {/* <Checkbox
          label="Hide finished"
          checked={query ? true : false}
          onCheck={this.onCheckShowOnlyUnfinished}
        /> */}
        {/* <Checkbox
                label='Disable observe'
                checked={disabled}
                onCheck={this.onCheckDisable} />*/}
      </div>
      <div style={styles.content} className="mobile-margins">
        <FlipMove enterAnimation="fade" leaveAnimation="fade">
          {docs && (
            <span>
              {docs.docs.map((doc) => (
                <Topic topic={doc} key={doc.id}></Topic>
              ))}
            </span>
          )}
        </FlipMove>
      </div>
      {/* {isLoading ? (
        <div style={styles.loader}>
          <CircularProgress />
        </div>
      ) : undefined} */}
    </div>
  )
}

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  loader: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottom: '1px solid #DDD',
  },
  content: {
    flex: 1,
    overflowY: 'scroll',
  },
}
export default UserHomepage
