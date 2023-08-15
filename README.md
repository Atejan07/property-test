# Full-stack Technical Task

## Installation

- Run `yarn install` on both the Server folder and Client folder.

## Usage

- Include the following line in the `.env` file in the Server folder with the desired PORT:

```bash
PORT=3001
```

## Cloudinary

To handle pictures upload, I utilised Cloudinary, a cloud-based image and video management.

To get started, please include the following details in your `.env` file located in the Server folder:

```bash
PUBLIC_CLOUDINARY_CLOUD_NAME=ddm6kawa9
CLOUDINARY_PRESET=whstv677
CLOUDINARY_API_KEY=173743349211811
CLOUDINARY_API_SECRET=HuwrAiQ_RXtZ9xOgajZz0XnpoFs
CLOUDINARY_URL=cloudinary://173743349211811:HuwrAiQ_RXtZ9xOgajZz0XnpoFs@ddm6kawa9
```

## Getting started

Run `yarn start` from the Client folder.
Run `yarn start` from the Server folder.

## Tests

- To run the React components tests, please run `yarn test` in the Client folder.
- To run the Node endpoints tests, please run `yarn test` in the Server folder.

## What would I do next?

If I had 20+ hours to further develop this project I would build:

- User authentication and registration to maintain the security and privacy of user data.
- Edit and delete property functionalities, enhancing the user experience and giving them control over their listings.
- Search bar to quickly find specific properties based on keywords, improving usability within the app.
- Sorting and filtering options for property listings, improving the user experience by displaying properties based on their preferences.
- Address Finder API to auto-suggest addresses as users start typing, reducing input errors and making the property addition process more efficient.
- Feature to save properties in a user's favorites list, enhancing engagement and encouraging users to return to the platform.
- More robust error handling and validation, making the app more stable, secure, and user-friendly.
- Improved UI/UX design, enhancing the user experience.
