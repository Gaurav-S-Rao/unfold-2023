import { Box, Button, Card, Container, FormHelperText, TextField, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { UploadAvatar } from 'src/components/upload';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import axiosInstance, { endpoints } from 'src/utils/axios-instance';
import { fData } from 'src/utils/format-number';
export default function AdvertsPageNewView() {
  const [avatarUrl, setAvatarUrl] = useState<any>();

  const { replace } = useRouter();

  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setAvatarUrl(newFile);
      }
    },
    [avatarUrl]
  );

  useEffect(() => {
    if (avatarUrl) {
      setFormValues({
        ...formValues,
        image: avatarUrl.preview,
      });
    }
  }, [avatarUrl, formValues]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('🚀 ~ file: register-view.tsx ~ line 149 ~ handleSubmit ~ formValues', formValues);

    try {
      await axiosInstance.post(endpoints.adverts.create, {
        ...formValues,
      });

      replace(paths.dashboard.adverts.root);
    } catch (err) {
      console.log('🚀 ~ file: register-view.tsx ~ line 149 ~ handleSubmit ~ err', err);
    }
  };

  return (
    <Container sx={{ mt: '2%' }}>
      <Typography variant="h3" sx={{ mb: 5 }}>
        Create new Advertisment
      </Typography>

      {/* Upload Image card */}
      <form onSubmit={handleSubmit}>
        <Box
          gap={2}
          sx={{
            display: 'flex',
          }}
        >
          <Card
            sx={{
              width: 500,
            }}
          >
            <Box sx={{ m: 2 }}>
              <UploadAvatar onDrop={handleDrop} file={avatarUrl} />
              <FormHelperText sx={{ px: 2 }}>
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  Allowed image file types only
                  <br />a max size of {fData(3000000)}
                </Typography>
              </FormHelperText>
            </Box>
          </Card>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <Card
              sx={{
                width: 500,
              }}
            >
              <Box
                sx={{ m: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              >
                <TextField
                  sx={{ m: 1, minWidth: 200 }}
                  label="Title"
                  variant="outlined"
                  name="title"
                  value={formValues.title}
                  onChange={handleFormChange}
                />
                <TextField
                  sx={{ m: 1, minWidth: 200 }}
                  label="Reach Description"
                  variant="outlined"
                  name="description"
                  value={formValues.description}
                  onChange={handleFormChange}
                />

                <TextField
                  sx={{ m: 1, minWidth: 200 }}
                  label="Redirect Link"
                  variant="outlined"
                  name="link"
                  type="url"
                  value={formValues.link}
                  onChange={handleFormChange}
                />
              </Box>
            </Card>

            <Button
              sx={{ m: 1, color: 'red' }}
              onClick={() => {
                setFormValues({
                  title: '',
                  description: '',
                  image: '',
                  link: '',
                });
              }}
            >
              Clear
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ m: 1, width: '100%', minHeight: 50 }}
              disabled={Object.values(formValues).some((value) => value === '')}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
}
