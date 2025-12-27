import { useNavigate } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import useService from "../../hooks/useService";
import PathConstants from "../../routes/PathConstants";
import { toast } from "react-toastify";

export default function Logout() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const authService = useService(AuthService);

  useEffect(() => {
    setLoading(true);
    authService.logout().subscribe({
      next: response => {
        if (response.status) {
          toast.dismiss();
          toast.success("Logged Out Successfully!");
          navigate(PathConstants.HOME);
        }
        setLoading(false);
      },
      error: err => {
        toast.dismiss();
        toast.success(err?.response?.data?.message);
        setLoading(false);
        navigate(-1);
      },
    });
  }, []);

  return (
    <div>
      {loading && (
        // <div>
        <span>Logging Out...</span>
      )}
      {loading && <span className="spinner-border" role="status"></span>}
    </div>
  );
}
