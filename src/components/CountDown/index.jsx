import moment from 'moment';
import React, { useEffect, useState } from 'react';

const CountDown = ({ targetTime }) => {
	const [time, setTime] = useState(
		{
			hours: 0,
			minutes: 0,
			seconds: 0,
		}
	);

	const calculatorTime = (targetTime) => {
		const now = moment();
		const duration = moment.duration(targetTime.diff(now));

		const hours = duration.hours();
		const minutes = duration.minutes();
		const seconds = duration.seconds();

		return { hours, minutes, seconds };
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			const remaining = calculatorTime(targetTime);
			setTime(remaining);
		}, 1000);
		return () => {
			return () => clearInterval(intervalId);
		};
	}, [time]);

	return (
		<div className="deal-countdown is-countdown" data-until="+10h">
			<span className="countdown-row countdown-show3">
				<span className="countdown-section">
					<span className="countdown-amount">{time.hours || 0}</span>
					<span className="countdown-period">hours</span>
				</span>
				<span className="countdown-section">
					<span className="countdown-amount">{time.minutes || 0}</span>
					<span className="countdown-period">minutes</span>
				</span>
				<span className="countdown-section">
					<span className="countdown-amount">{time.seconds || 0}</span>
					<span className="countdown-period">seconds</span>
				</span>
			</span>
		</div>
	);
}

export default CountDown