import './LoadingSpinner.scss';

type Props = {
    height?: string;
}

export const LoadingSpinner = ({height}: Props) => {
    return (
      <div style={height ? {height} : undefined} className="loader-container">
        <span className="loader"></span>
      </div>
    );
}