import { IconExternalLink } from '@tabler/icons-react';
import { useContext } from 'react';

import { useTranslation } from 'next-i18next';

import { RagmanAssistant } from '@/types/assistant';

import HomeContext from '@/pages/api/home/home.context';

export const AssistantSelect = () => {
  const { t } = useTranslation('chat');

  const {
    state: { selectedConversation, assistants },
    handleUpdateConversation,
    dispatch: homeDispatch,
  } = useContext(HomeContext);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectedConversation &&
      handleUpdateConversation(selectedConversation, {
        key: 'assistant',
        value: assistants.find(
          (assistant) => assistant.aid === e.target.value,
        ) as RagmanAssistant,
      });
  };

  return (
    <div className="flex flex-col">
      <label className="mb-2 text-left text-neutral-700 dark:text-neutral-400">
        {t('Assistants')}
      </label>
      <div className="w-full rounded-lg border border-neutral-200 bg-transparent pr-2 text-neutral-900 dark:border-neutral-600 dark:text-white">
        <select
          className="w-full bg-transparent p-2"
          placeholder={t('Select an assistant') || ''}
//          value={selectedConversation?.assistant?.aid }
          defaultValue={'DEFAULT'}
          onChange={handleChange}
        >
          <option key="1" value="DEFAULT" className="dark:bg-[#343541] dark:text-white">
                -Please select-
          </option>

          {assistants ? assistants.map((assistant) => (
            <option
              key={assistant.aid}
              value={assistant.aid}
              className="dark:bg-[#343541] dark:text-white"
            >
              {assistant.aid === selectedConversation?.assistant?.aid
                ? `${assistant.name}`
                : assistant.name}
            </option>
          )) : "oops2"}
  
        </select>
      </div>
    </div>
  );
};
