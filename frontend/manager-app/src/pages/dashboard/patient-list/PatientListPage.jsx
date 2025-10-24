import GenericProgressBar from "../../../components/generic/ui/GenericProgressBar";
import { usePatientList } from "../../../hooks/dashboard/patient-list/usePatientList";

const PatientListPage = () => {
  const { patientList, isSuccess, providers, statuses } = usePatientList();

  if (!isSuccess) return <GenericProgressBar />;

  return (
    <ul className="border border-gray-100 rounded-md shadow-md">
      <li className="hidden lg:grid lg:grid-cols-[2fr_2fr_2fr_1fr_auto] items-center p-4 bg-gray-100 font-semibold text-gray-700 border-b border-gray-200">
        <span className="truncate">Nombre</span>
        <span className="truncate">Email</span>
        <span className="truncate">Provider</span>
        <span className="truncate">Status</span>
        <span className="text-right">Acciones</span>
      </li>

      {patientList.map((patient) => {

        console.log('statuses.filter(s => s.parent_id === patient.status_id)****', statuses.filter(s => s.parent_id === patient.status_id))

        const providerName =
          providers.find((p) => p.id === patient.provider_id)?.full_name || "-";
        const statusName =
          statuses.find((s) => s.id === patient.status_id)?.name || "-";

        return (
          <li
            key={patient.id}
            className="grid grid-cols-1 gap-2 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            lg:className="lg:grid lg:grid-cols-[2fr_2fr_2fr_1fr_auto] lg:items-center lg:gap-0"
          >
            {/* Campo: Nombre */}
            <div className="lg:truncate">
              <span className="block lg:hidden font-semibold text-gray-500 text-sm">
                Nombre:
              </span>
              <span className="font-semibold text-gray-800">
                {patient.full_name}
              </span>
            </div>

            <div className="lg:truncate">
              <span className="block lg:hidden font-semibold text-gray-500 text-sm">
                Email:
              </span>
              <span className="text-gray-600">{patient.email}</span>
            </div>

            <div className="lg:truncate">
              <span className="block lg:hidden font-semibold text-gray-500 text-sm">
                Provider:
              </span>
              <span className="text-gray-600">{providerName}</span>
            </div>

            <div className="lg:truncate">
              <span className="block lg:hidden font-semibold text-gray-500 text-sm">
                Status:
              </span>
              <span className="text-green-600 font-medium">{statusName}</span>
            </div>
            <div >
              Change Status (Pendiente)
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default PatientListPage;
