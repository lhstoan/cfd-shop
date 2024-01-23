import React from 'react';

function timeAgo(createdAt) {
	const now = new Date();
	const creat = new Date(createdAt)
	const timeDifference = now - creat;

	const seconds = Math.floor(timeDifference / 1000);
	const minutes = Math.floor(seconds / 60);
	const hours = Math.floor(minutes / 60);
	const days = Math.floor(hours / 24);

	if (seconds < 60) {
		return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
	} else if (minutes < 60) {
		return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
	} else if (hours < 24) {
		return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
	} else {
		return `${days} day${days !== 1 ? 's' : ''} ago`;
	}
}

const ReviewSection = ({ review }) => {
	const { id, order, product, rate, title, description: descReview, createdAt } = review || {};
	const formattedDate = new Date(createdAt).toLocaleDateString('en-GB');
	return (
		<div className="review">
			<div className="row no-gutters">
				<div className="col-auto">
					<h4><a href="#" onClick={(e) => { e.preventDefault(); e.stopPropagation() }}>#{order.slice(-4)}</a></h4>
					<div className="ratings-container">
						<div className="ratings">
							<div className="ratings-val" style={{ width: `${(rate || 0) * 20}%` }} />
						</div>
					</div>
					<span className="review-date">{formattedDate || ""}</span>
				</div>
				<div className="col">
					<h4>{title}</h4>
					<div className="review-content" dangerouslySetInnerHTML={{ __html: descReview }} />
				</div>
			</div>
		</div>
	)
}

export default ReviewSection