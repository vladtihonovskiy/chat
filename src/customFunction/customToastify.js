import { toast } from 'react-toastify';


export  default function customToastify(text, type = false) {
	switch (type) {
		case "error":
			toast.error(text);
			break;
		case "success":
			toast.success(text);
			break;
		case "info":
			toast.info(text);
			break;
		case "warn":
			toast.warn(text);
			break;
		default:
			toast(text);
			break;
	}
}
