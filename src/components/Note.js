import { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';

const Note = ({ id, text, date, handleDeleteNote, handleEditNote }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newText, setNewText] = useState(text);

	const handleEditClick = () => {
		setIsEditing(true);
	};

	const handleSaveClick = () => {
		handleEditNote(id, newText);
		setIsEditing(false);
	};

	return (
		<div className={`note ${isEditing ? 'editing' : ''}`}>
			{isEditing ? (
				<textarea
					rows='8'
					cols='10'
					value={newText}
					onChange={(e) => setNewText(e.target.value)}
				></textarea>
			) : (
				<span>{text}</span>
			)}
			<div className='note-footer'>
				<small>{date}</small>
				<div className='note-footer-icons'>
					{isEditing ? (
						<button onClick={handleSaveClick} className='save'>Save</button>
					) : (
						<MdEdit
							onClick={handleEditClick}
							className='edit-icon icon'
							size='1.3em'
						/>
					)}
					<MdDeleteForever
						onClick={() => handleDeleteNote(id)}
						className='delete-icon icon'
						size='1.3em'
					/>
				</div>
			</div>
		</div>
	);
};

export default Note;
