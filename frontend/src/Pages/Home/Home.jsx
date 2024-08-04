import Navbar from "../../Components/Navbar";
import NoteCard from "../../Components/Cards/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "./AddEditNotes";
import { useState } from "react";
import Modal from "react-modal";
const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  return (
    <>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Meeting on 7th April"
            date="3rd Apr 2024"
            content="Meeting on 7th April Meeting on 7th April"
            tags="#Meetings"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>
      <button
        className=" w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-800 absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className=""
      ></Modal>
      <AddEditNotes />
    </>
  );
};

export default Home;
