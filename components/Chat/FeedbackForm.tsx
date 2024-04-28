import { IconX } from '@tabler/icons-react';
import { FC, useState } from "react";

import { FeedbackOption } from '@/types/feedback';

interface Props {
  onClose: () => void,
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

export const FeedbackForm: FC<Props> = ({ onClose }) => {
  const [moreSelected, setMoreSelected] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const selectMore = () => {
    setMoreSelected(true);
  }

  const updateComment = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  }

  const submitFeedback = (tag: string, userComment: string) => {
    const finaltag: string | undefined = tag ? tag : undefined;
    const finalComment: string | undefined = userComment ? userComment : undefined;

    console.log(finaltag, finalComment);

    onClose();
  }

  const selectOption = (event: React.MouseEvent<HTMLButtonElement>) => {
    const selectedName: string = event.currentTarget.name;

    setSelectedOption(selectedOption === selectedName ? "" : selectedName);
    
    if (!moreSelected) {
      submitFeedback(selectedName, comment);
    }
  }

  const submitButton = () => {
    if (selectedOption.length > 0 || comment.length > 0) {
      submitFeedback(selectedOption, comment);
    } else {
      alert("Please select a reason or enter a comment for this bad response");
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
              className={`${
                option.name === selectedOption 
                  ? "border-gray-100 bg-gray-100 text-gray-900"
                  : "border-gray-400 transition-colors duration-200 hover:bg-gray-600"
                } border rounded-md px-3 py-0.5`}
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
          className="rounded-md border border-gray-400 px-4 py-2 text-gray-200 duration-200 hover:bg-gray-600 min-w-max"
          onClick={submitButton}
        >
          Submit
        </button>
      </div>}
    </div>
  );
}