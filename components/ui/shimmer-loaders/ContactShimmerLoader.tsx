function ContactShimmerLoader() {
  return (
    <div className="p-4">
      <div className="flex items-start gap-4">
        <div className="h-[50px] w-[50px] rounded-full bg-primary animate-pulse"></div>
        <div className="w-full flex-1 space-y-2">
          <p className="h-3 w-full bg-primary animate-pulse"></p>
          <p className="h-2 w-2/3 bg-primary animate-pulse"></p>
          <p className="h-2 w-1/3 bg-primary animate-pulse"></p>
        </div>
      </div>

      <p className="h-2 mt-2 bg-primary rounded-full animate-pulse"></p>
    </div>
  );
}

export default ContactShimmerLoader;
