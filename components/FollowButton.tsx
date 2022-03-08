import { HeartIcon } from '@heroicons/react/outline'
import React from 'react'

type Props = {
  isFollowing:boolean,
  toggleFollow:() => void
}

const styles = {
  button: `bg-sky-500 hover:bg-sky-600 flex gap-2 items-center  group`,
  heartOutlined: `h-5 w-5 group-hover:fill-current duration-100 ease-out group-hover:scale-125`,
  heartFilled: `h-5 w-5 fill-current duration-100 ease-out group-hover:scale-125`
}

const FollowButton = ({isFollowing,toggleFollow}: Props) => {
  return (
    <button onClick={toggleFollow} className={styles.button}>
            <HeartIcon className={isFollowing ? styles.heartFilled : styles.heartOutlined}/>
            {isFollowing? 'Following':'Follow'}
    </button>
  )
}

export default FollowButton