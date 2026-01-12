export default function EntrarForm() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 min-h-screen">
      <form className="flex flex-col items-center gap-16  " action="">
        <img className="w-xl" src="./logo.png" alt="" />
        <label className="flex items-center gap-4">
          Email:
          <input
            id="emailSignup"
            type="text"
            className="bg-gray-200 w-100 border border-[#169545] outline-none  rounded-md"
          />
        </label>
        <label className="flex items-center gap-4">
          User:
          <input
            id="userSignup"
            type="text"
            className="bg-gray-200 w-100 border border-[#169545] outline-none  rounded-md"
          />
        </label>
        <label className="flex items-center gap-4">
          Senha:
          <input
            id="senhaSignup"
            type="password"
            className="bg-gray-200 w-100 border border-[#169545] outline-none  rounded-md"
          />
        </label>
        <input
          type="submit"
          className="bg-[#169545] w-52  text-amber-50 p-8 h-10 cursor-pointer rounded-md hover:bg-[#033816] transition-colors duration-300"
        />
      </form>
    </div>
  );
}
