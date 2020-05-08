declare module "prismic-reactjs" {
	interface RichTextProps {
		render?: any;
	}

	export const RichText: React.FC<RichTextProps> & {
		asText: (block: any) => string;
	};
}
