import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/ask', {
        question,
        history: conversation,
      });
      setConversation(response.data.history);
      setQuestion('');
      console.log(conversation);
    } catch (error) {
      console.error("Error fetching answer:", error);
    }
  };

  return (
    <div className="App">
      <h1>Travel Planner</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about hotels..."
        />
        <button type="submit">Ask</button>
      </form>
      <div>
        {conversation.map((msg, index) => (
          <p key={index}><strong>{msg.role}:</strong> {msg.content}</p>
        ))}
      </div>
    </div>
  );
}

export default App;