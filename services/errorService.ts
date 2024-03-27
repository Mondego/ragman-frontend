import { useMemo } from 'react';

import { useTranslation } from 'next-i18next';

import { ErrorMessage } from '@/types/error';

const useErrorService = () => {
  const { t } = useTranslation('chat');

  return {
    getAssistantsError: useMemo(
      () => (error: any) => {
        return !error
          ? null
          : ({
              title: t('Error fetching assistants.'),
              code: error.status || 'unknown',
              messageLines: error.statusText
                ? [error.statusText, t('RAGMan may be experiencing issues.',)]
                : [
                    t('RAGMan may be experiencing issues.',),
                  ],
            } as ErrorMessage);
      },
      [t],
    ),
  };
};

export default useErrorService;
