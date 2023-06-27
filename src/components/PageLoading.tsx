export const PageLoading = ({ size }: { size?: "xs" | "sm" | "md" | "lg" }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-indigo-600">
      <LoadingSpinner size={size} />
    </div>
  );
};

export const LoadingSpinner = ({
  size = "md",
}: {
  size?: "xs" | "sm" | "md" | "lg";
}) => {
  return (
    <span
      className={`loading loading-spinner ${
        size ? `loading-${size}` : "loading-md"
      }`}
    ></span>
  );
};
