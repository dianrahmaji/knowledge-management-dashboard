import ChatBubble from './ChatBubble'

const ChatContainer = () => {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 md:px-14 overflow-y-scroll h-7/8">
      <div className="flex flex-col justify-end ">
        {[...Array(110)].map((_, i) => (
          <ChatBubble key={i} user="Dian Rahmaji" />
        ))}
      </div>
    </div>
  )
}

export default ChatContainer