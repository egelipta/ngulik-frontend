const isDev = process.env.UMI_ENV === 'development';

export function dlog(context: string, ...messages: any[]): void {
  if (isDev) {
    const timestamp = new Date().toISOString();
    const formattedMessages = messages.map((message) =>
      typeof message === 'string' ? message : JSON.stringify(message),
    );

    console.log(`[${timestamp}] [${context}]`, ...formattedMessages);
  }
}

export function nomorPonsel(input: string): string {
  // Remove non-numeric characters from the input
  const numericInput = input.replace(/\D/g, '');

  // Check if the number starts with "08"
  if (numericInput.startsWith('08')) {
    // If it starts with "08", replace "08" with "628"
    return `628${numericInput.slice(2)}`;
  } else if (numericInput.startsWith('62')) {
    // If it starts with "62", consider it valid and return as is
    return `62${numericInput.slice(2)}`;
  }

  // If it doesn't start with "08" or "62", it may not be a valid format
  return '';
}
