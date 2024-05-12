import { useState } from 'react';
import "./scss/App.scss";
import Switch from './components/Switch';

function App() {
	const [showTime, setShowTime] = useState<boolean>(false);
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
		const hour = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");

		let formattedDate = `${year}-${month}-${day}`;

		if (showTime) {
			formattedDate = `${formattedDate}T${hour}:${minutes}`;
		}

		return formattedDate;
	}

	return (
		<>
			<header>
				<label className='time-switch-label'>
					{ showTime ? "Show Time" : "Hide Time" }
				</label>

				<Switch
					checked={showTime}
					onUpdate={value => setShowTime(value)}
				/>
			</header>

			<main>
				<h1 className='date-text'>
					{
						randomDate === null ?
						`${startDate.toDateString()} ${showTime ? startDate.toLocaleTimeString() : ""}` :
						`${randomDate.toDateString()} ${showTime ? randomDate.toLocaleTimeString() : ""}`
					}
				</h1>

				<form className="random-date-form">
					<div className='form-group'>
						<label htmlFor="startDateInput">
							From
						</label>
						<input
							type={showTime ? "datetime-local" : "date"}
							id="startDateInput"
							value={getFormattedDate(startDate)}
							onChange={({ target }) => setStartDateMS(new Date(target.value).getTime())}
						/>
					</div>
					<div className='form-group'>
						<label htmlFor="endDateInput">
							To
						</label>
						<input
							type={showTime ? "datetime-local" : "date"}
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
		</>
	);
}

export default App;