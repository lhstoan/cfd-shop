import React, { useMemo } from 'react';
import styled from 'styled-components';

const PAGE_STEP = 1;

const PagiItemWrapper = styled.li`
  margin: 0 10px;
  .page-link {
    &:hover {
      color: #fcb941 !important;
    }
    display: flex;
    gap: 10px;
  }
`;

const NavigationSection = ({ page, limit = 0, total = 0, onPagiChange }) => {
	const totalPage = useMemo(() => {
		if (!limit || !total) {
			return 1;
		}
		return Math.ceil(Number(total) / Number(limit)) || 1;
	}, [total, limit])

	const pagiList = useMemo(() => {
		let start = page - PAGE_STEP;
		let end = page + PAGE_STEP;

		if (start <= 0) {
			start = 1;
			end = start + PAGE_STEP * 2;
			if (end > totalPage) {
				end = totalPage;
			}
		}
		if (end >= totalPage) {
			start = end - PAGE_STEP * 2;
			end = totalPage;
			if (start < 1) {
				start = 1;
			}
		}
		const list = [];
		for (let index = start; index < end + 1; index++) {
			list.push(index);
		}
		return list;
	}, [page, totalPage])

	// actions to navi
	const _onNext = () => {
		const nextPage = page + 1;

		if (nextPage <= totalPage) {
			onPagiChange(nextPage)
		}
	}

	const _onPrev = () => {
		const prevPage = page - 1;
		if (prevPage > 0) {
			onPagiChange(prevPage);
		}
	}

	const _onFirst = () => {
		onPagiChange(1);
	}

	const _onLast = () => {
		onPagiChange(totalPage);
	}

	return (
		<nav aria-label="Page navigation">
			<ul className="pagination justify-content-center">
				<PagiItem isDisabled={pagiList[0] === 1} onClick={_onFirst}>
					<span aria-hidden="true">
						<i className="icon-long-arrow-left" />
					</span>
					First
				</PagiItem>
				<PagiItem isDisabled={page === 1} onClick={_onPrev}>
					<span aria-hidden="true">
						<i className="icon-long-arrow-left" />
					</span>
					Prev
				</PagiItem>
				{
					pagiList?.length > 0 && pagiList?.map((pageLoad) => (
						<PagiItem key={pageLoad} isActive={pageLoad === page} isDisabled={pageLoad === page}
							onClick={() => {
								onPagiChange(pageLoad);
							}}
						>
							{pageLoad}
						</PagiItem>
					))
				}
				<li className="page-item-total">of {totalPage}</li>
				<PagiItem isDisabled={pagiList[pagiList.length - 1] === page} onClick={_onNext}>
					Next
					<span aria-hidden="true">
						<i className="icon-long-arrow-right" />
					</span>
				</PagiItem>
				<PagiItem isDisabled={pagiList[pagiList.length - 1] === totalPage} onClick={_onLast}>
					Last
					<span aria-hidden="true">
						<i className="icon-long-arrow-right" />
					</span>
				</PagiItem>
			</ul>
		</nav>
	)
}

export default NavigationSection

const PagiItem = ({ children, isActive = false, isDisabled = false, className = "", onClick, ...restProps }) => {
	return (
		<PagiItemWrapper
			className={`page-item ${className} ${isActive ? "active" : ""} ${isDisabled ? "disabled" : ""} `}
			onClick={() => (isDisabled ? {} : onClick())}  {...restProps}>
			<a href={`#page-${children}`} className="page-link" role="button">
				{children}
			</a>
		</PagiItemWrapper>
	)
}