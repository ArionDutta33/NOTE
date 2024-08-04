const AddEditNotes = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label htmlFor="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go to gym at 5"
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="">CONTENT</label>
        <textarea
          name=""
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2"
          placeholder="content"
          rows={10}
        ></textarea>
      </div>

      <div className="mt-3">
        <label htmlFor="" className="input-label">
          {" "}
          TAGS
        </label>
      </div>

      <button className="btn-primary font-medium mt-5 p-3" onClick={() => {}}>
        ADD
      </button>
    </div>
  );
};

export default AddEditNotes;
