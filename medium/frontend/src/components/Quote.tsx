const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="max-w-lg">
          <div className="text-3xl font-bold">
            "The customer support i recieved was exceptional. The support team
            went above and beyond to address my concerns."
          </div>
          <div className="mt-2.5">
                <div className="max-w-md text-left text-xl font-semibold">
                    Jules winnfield
                </div>
                <div className="max-w-md text-left text-sm font-medium text-slate-700">
                    CEO Acme Inc
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quote;
