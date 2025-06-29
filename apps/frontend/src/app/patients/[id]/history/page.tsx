import HistoryPage from 'src/components/patients/HistoryPage';

interface PatientHistoryPageProps {
	params: Promise<{
		id: string;
	}>;
}

export default async function PatientHistoryPage({ params }: PatientHistoryPageProps) {
	const { id } = await params;
	return <HistoryPage id={id} />;
}
