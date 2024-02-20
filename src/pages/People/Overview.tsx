import {
	LoadingSpinner,
	Paginator,
} from "../../components";
import { usePeoplePaginated } from "./people-service";

import "./Overview.scss";

export const Overview = () => {
	const { isLoading, getPeople, count, people } =
		usePeoplePaginated();
	const totalPages = Math.ceil((count || 0) / 10);

	const onPageChange = (page: number) => {
		getPeople(page);
	};

	return (
		<div className="people-overview">
			<h1>People Overview</h1>
			<Paginator
				onPageChange={onPageChange}
				totalPages={totalPages}
			/>
			{isLoading ? (
				<LoadingSpinner />
			) : (
				<ul>
					{people?.map(p => (
						<li key={p.url}>{p.name}</li>
					))}
				</ul>
			)}
		</div>
	);
};
