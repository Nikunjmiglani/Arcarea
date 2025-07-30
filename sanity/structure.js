export const structure = (S) =>
  S.list()
    .title('Content') // this sets the sidebar title
    .items([
      S.documentTypeListItem('post').title('Post'),
      S.documentTypeListItem('author').title('Author'),
      S.documentTypeListItem('category').title('Category'),
    ]);
