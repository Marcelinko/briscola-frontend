import { useNavigate } from "react-router-dom";
export const NoPage = () => {
  const navigate = useNavigate();
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1>No page</h1>
        <button onClick={() => navigate('/')}>Home</button>
      </div>
    )
}