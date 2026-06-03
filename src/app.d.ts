declare global {
	const __APP_VERSION__: string;
	namespace App {
		interface PageState {
			showPasskeySetup?: boolean;
			authDialog?: boolean;
			confirm?: {
				title: string;
				description: string;
				confirmLabel: string;
				cancelLabel: string;
				variant: 'default' | 'destructive';
			};
		}
	}
}

export {};
