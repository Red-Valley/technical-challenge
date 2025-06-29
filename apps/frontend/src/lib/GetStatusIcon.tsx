import { Calendar, CheckCircle, User, X, Clock, HelpCircle } from 'lucide-react';

export const getStatusIcon = (statusName: string) => {
	switch (statusName.toLowerCase()) {
		case 'scheduled':
			return <Calendar className="h-5 w-5 text-blue-600" />;
		case 'checked-in':
			return <CheckCircle className="h-5 w-5 text-yellow-600" />;
		case 'in consultation':
			return <User className="h-5 w-5 text-green-600" />;
		case 'cancelled':
			return <X className="h-5 w-5 text-red-600" />;
		case 'no-show':
			return <Clock className="h-5 w-5 text-gray-600" />;
		default:
			return <HelpCircle className="h-5 w-5 text-gray-600" />;
	}
};
