import { useState } from 'react';
import "./scss/App.scss";

function App() {
	const [startDateMS, setStartDateMS] = useState<number>(new Date().getTime());
	const [endDateMS, setEndDateMS] = useState<number>(() => {
		const currentDate = new Date();
		return new Date().setFullYear(currentDate.getFullYear() + 1);
	});
	const [randomDate, setRandomDate] = useState<Date | null>(null);
	const startDate = new Date(startDateMS);
	const endDate = new Date(endDateMS);

	function getFormattedDate(date: Date) {
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const day = date.getDate().toString().padStart(2, "0");
		const year = date.getFullYear().toString().padStart(4, "0");

		return `${year}-${month}-${day}`;
	}

	return (
		<main>
			<h1 className='date-text'>
				{
					randomDate === null ?
					startDate.toDateString() :
					randomDate.toDateString()
				}
			</h1>

			<form className="random-date-form">
				<div className='form-group'>
					<label htmlFor="startDateInput">
						Start Date
					</label>
					<input
						type="date"
						id="startDateInput"
						value={getFormattedDate(startDate)}
						onChange={({ target }) => setStartDateMS(new Date(target.value).getTime())}
					/>
				</div>
				<div className='form-group'>
					<label htmlFor="endDateInput">
						End Date
					</label>
					<input
						type="date"
						id="endDateInput"
						value={getFormattedDate(endDate)}
						onChange={({ target }) => setEndDateMS(new Date(target.value).getTime())}
					/>
				</div>

				<button 
					type='button'
					onClick={() => setRandomDate(new Date(Math.floor(Math.random() * (endDateMS - startDateMS) + startDateMS)))}
				>
					Get Random Date
				</button>
			</form>
		</main>
	);
}

export default App;