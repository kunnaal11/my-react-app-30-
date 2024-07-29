import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NoteList';
import Searchbar from './components/Searchbar';
import Header from './components/Header';

const App = () => {
   /*  const [notes, setNotes] = useState([
		  {
		 // 	id: nanoid(),
		 // 	text: 'This is my first note!',
		 // 	date: '15/04/2021',
		  },
		  {
		 // 	id: nanoid(),
		 // 	text: 'This is my second note!',
		 // 	date: '21/04/2021',
		  },
		 
		 
	]); */
	const [notes, setNotes] = useState(() => {
		const savedNotes = localStorage.getItem("new-data");
		const notes = JSON.parse(savedNotes);
		return ( notes || [] );
	  });
	
	  useEffect(() => {
		localStorage.setItem("new-data", JSON.stringify(notes));
	  }, [notes]);   

	const [searchText, setSearchText] = useState('');

	const [darkMode, setDarkMode] = useState(false);

	






	/*useEffect(() => {
		const savedNotes =localStorage.getItem('notes-data')
	    
		if (savedNotes) {
			setNotes(JSON.parse(savedNotes));
		}                                                //This method is not working here
	}, []);

	useEffect(() => {
		localStorage.setItem('notes-data',JSON.stringify(notes))
	}, [notes]);  */

	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			text: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

    const editNote = (id, newText) => {
		const newNotes = notes.map((note) => {
			if (note.id === id) {
				return { ...note, text: newText };
			}
			return note;
		});
		setNotes(newNotes);
	};  
	

	return (
		<div className={`${darkMode && 'dark-mode'}`}>
			<div className='container'>
				<Header handleToggleDarkMode={setDarkMode} />
				<Searchbar handleSearchNote={setSearchText} />
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleEditNote={editNote}
					handleDeleteNote={deleteNote}
				/>
			</div>
		</div>
	);
};

export default App;