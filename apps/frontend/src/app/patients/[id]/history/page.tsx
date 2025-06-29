import HistoryPage from 'src/components/patients/HistoryPage';

interface PatientHistoryPageProps {
	params: {
		id: string;
	};
}

export default async function PatientHistoryPage({ params }: PatientHistoryPageProps) {
	return <HistoryPage id={params.id} />;
}
