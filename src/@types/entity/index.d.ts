
declare module entity {

	interface UserTypes {
		id?: number;
		username?: string;
		email?: string;
		persona?: string;
		mood?: string;
		user_stacks?: string;
		created_at?: Date;
		updated_at?: Date;
	}

	interface PostTypes {
		id: number;
		writer: string;
		category: string;
		title: string;
		content: string;
    open: boolean;
		created_at: Date;
		updated_at: Date;
		backend: number;
		frontend: number;
		total: number;
		post_stacks: string;
	}

	interface DiaryTypes {
		id: number;
		content: string;
		created_at: Date;
		updated_at: Date;
	}

	interface CommentTypes {
		id: number;
		writer: string;
		comment: string;
		created_at: Date;
		updated_at: Date;
	}
}

export = entity;
