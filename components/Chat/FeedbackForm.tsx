import { IconX } from '@tabler/icons-react';
import { FC, useState } from "react";

import { FeedbackOption } from '@/types/feedback';

interface Props {
  onClose: () => void,
  onSubmit: (tag?: string, comments?: string) => void
}

const feedbackOptions: FeedbackOption[] = [
  {displayName: "Don't like the style", name: "bad-style"},
  {displayName: "Not factually correct", name: "incorrect"},
  {displayName: "Didn't fully follow instructions", name: "not-following-instructions"},
  {displayName: "Refused when it shouldn't have", name: "improper-refusal"},
  {displayName: "Being lazy", name: "laziness"},
  {displayName: "More...", name: "more"},
  {displayName: "Other", name: "other"}
];

export const FeedbackForm: FC<Props> = ({ onClose, onSubmit }) => {
  const [moreSelected, setMoreSelected] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const getTagButtonClass = (name: string) => {
    const selectedBasedOnPressed: string = name === selectedOption ? "border-gray-100 bg-gray-100 text-gray-900" : "border-gray-400 transition-colors duration-200 hover:bg-gray-600";
  
    return "border rounded-md px-3 py-0.5 " + selectedBasedOnPressed;
  }

  const selectMore = () => {
    setMoreSelected(true);
  }

  const selectOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedName = event.currentTarget.name;

    if (moreSelected) {
      setSelectedOption(selectedOption === selectedName ? "" : selectedName);
    } else {
      onSubmit(selectedName, undefined);
    }
  }

  const updateComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  }

  const submit = () => {
    if (selectedOption.length > 0 || comment.length > 0) {
      onSubmit(selectedOption ? selectedOption : undefined, comment ? comment : undefined);
    } else {
      alert("Please select a reason for this bad response or enter a comment");
    }    
  }

  return (
    <div className="w-full rounded-md border border-gray-400 flex flex-col px-4 py-4 gap-2 text-gray-400 text-[14px]">
      <div className="flex flex-row justify-between">
        <p className="m-0">Tell us more:</p>
        <button className="hover:text-gray-200" onClick={onClose}>
          <IconX size={20} />
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {feedbackOptions.map((option, index) => {
          const showButton: boolean = !(option.name === "more" && moreSelected || option.name === "other" && !moreSelected);

          return showButton && (
            <button 
              key={index}
              name={option.name}
              className={getTagButtonClass(option.name)}
              onClick={option.name === "more" ? selectMore : selectOption}
            >
              {option.displayName}
            </button>
          );
        })}
      </div>
      {moreSelected && <div className="md:mt-4 flex flex-row gap-4">
        <input
          className="rounded-md border border-gray-400 px-4 py-2 placeholder-gray-400 text-gray-200 bg-transparent flex-grow"
          placeholder="(Optional) Tell us more..."
          onChange={updateComment}
          value={comment}
        >
        </input>
        <button
          className="rounded-md border border-gray-400 px-4 py-2 text-gray-200 duration-200 hover:bg-gray-600"
          onClick={submit}
        >
          Submit
        </button>
      </div>}
    </div>
  );
}