import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [createForm, setCreateForm] = useState({
    title: '',
    body: '',
  });
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    title: '',
    body: '',
  });

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const res = await Axios.get('http://localhost:3000/notes');
      setNotes(res.data.notes);
    } catch (err) {
      console.log(err);
    }
  }

  function updateCreateFormField(e) {
    const { name, value } = e.target;
    setCreateForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  async function createNote(e) {
    e.preventDefault();
    try {
      // Creating the note
      const res = await Axios.post('http://localhost:3000/notes', createForm);
      // Update the state
      setNotes((prevNotes) => [...prevNotes, res.data.note]);
      setCreateForm({ title: '', body: '' });
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteNote(_id) {
    try {
      await Axios.delete(`http://localhost:3000/notes/${_id}`);
      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== _id));
    } catch (err) {
      console.log(err);
    }
  }

  function handleUpdateFieldChange(e) {
    const { name, value } = e.target;
    setUpdateForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  async function updateNote() {
    try {
      const res = await Axios.put(
        `http://localhost:3000/notes/${updateForm._id}`,
        updateForm
      );
      setNotes((prevNotes) => {
        const updatedNotes = prevNotes.map((note) =>
          note._id === res.data.note._id ? res.data.note : note
        );
        return updatedNotes;
      });
      setUpdateForm({ _id: null, title: '', body: '' });
    } catch (err) {
      console.log(err);
    }
  }

  function toggleUpdate(note) {
    setUpdateForm({ _id: note._id, title: note.title, body: note.body });
  }

  return (
    <div className="App">
      <div>
        <h2>Notes:</h2>
        {notes &&
          notes.map((note) => (
            <div key={note._id}>
              <h3>{note.title}</h3>
              <button onClick={() => deleteNote(note._id)}>Delete Note</button>
              <button onClick={() => toggleUpdate(note)}>Update Note</button>
            </div>
          ))}
      </div>

      <div>
        <h2>Create a Note</h2>
        <form onSubmit={createNote}>
          <input
            type="text"
            name="title"
            value={createForm.title}
            onChange={updateCreateFormField}
          />
          <textarea
            name="body"
            cols="30"
            rows="5"
            value={createForm.body}
            onChange={updateCreateFormField}
          ></textarea>
          <button type="submit">Create note</button>
        </form>
      </div>

      {updateForm._id && (
        <div>
          <h2>Update Note</h2>
          <form onSubmit={updateNote}>
            <input
              type="text"
              name="title"
              value={updateForm.title}
              onChange={handleUpdateFieldChange}
            />
            <textarea
              name="body"
              cols="30"
              rows="5"
              value={updateForm.body}
              onChange={handleUpdateFieldChange}
            ></textarea>
            <button type="submit">Update note</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
