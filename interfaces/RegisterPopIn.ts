export interface RegisterPopIn {
    title: string;
    description: string;
    onSubmit: (inputValue: string) => void;
    onCancel: () => void;
  }