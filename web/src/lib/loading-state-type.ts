type LoadingState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string;
};

export default LoadingState;
