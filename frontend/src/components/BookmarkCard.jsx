import { useState } from 'react'
import axios from '../api/axios'
import ReactMarkdown from 'react-markdown'

const BookmarkCard = ({ bookmark, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(bookmark.title)
  const [url, setUrl] = useState(bookmark.url)
  const [showFull, setShowFull] = useState(false)

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/bookmarks/${bookmark._id}`, { title, url })
      onUpdate(response.data)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating bookmark:', error)
    }
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`/bookmarks/${bookmark._id}`)
      onDelete(bookmark._id)
    } catch (error) {
      console.error('Error deleting bookmark:', error)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Title"
          />
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="URL"
          />
          <div className="flex space-x-2">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-semibold mb-2">{bookmark.title}</h3>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mb-2 block"
          >
            {bookmark.url}
          </a>

          <div className="text-sm text-gray-700 whitespace-pre-wrap mb-2">
            <ReactMarkdown>
              {showFull || bookmark.summary.length <= 300
                ? bookmark.summary
                : `${bookmark.summary.slice(0, 300)}...`}
            </ReactMarkdown>
          </div>

          {bookmark.summary.length > 300 && (
            <button
              onClick={() => setShowFull(!showFull)}
              className="text-blue-500 hover:underline text-sm mb-2"
            >
              {showFull ? 'Show less' : 'Show more'}
            </button>
          )}

          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default BookmarkCard
