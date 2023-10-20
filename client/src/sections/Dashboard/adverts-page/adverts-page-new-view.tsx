import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  FormHelperText,
  TextField,
  Typography,
} from '@mui/material';
import { upload } from '@spheron/browser-upload';
import { enqueueSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { UploadAvatar } from 'src/components/upload';
import useFetchSpheronStorage from 'src/hooks/use-fetch-spheron-storage';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import axiosInstance, { endpoints } from 'src/utils/axios-instance';
import { fData } from 'src/utils/format-number';
export default function AdvertsPageNewView() {
  const [file, setFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploadLink, setUploadLink] = useState<string | null>(null);
  const [isLoadingSpheron, setIsLoadingSpheron] = useState<boolean>(false);

  const open = file && !uploadLink ? true : false;
  // const [dynamicLink, setDynamicLink] = useState('');

  const { data, error, isLoading } = useFetchSpheronStorage({ activate: open });

  const { replace } = useRouter();

  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const _file = acceptedFiles[0];

      if (_file) {
        setFile(_file);
      }
      const newFile = Object.assign(_file, {
        preview: URL.createObjectURL(_file),
      });

      if (newFile) {
        setAvatarUrl(newFile.preview);
      }
    },
    [file]
  );

  console.log(
    '🚀 ~ file: adverts-page-new-view.tsx ~ line 65 ~ AdvertsPageNewView ~ uploadLink',
    uploadLink
  );

  useEffect(() => {
    if (uploadLink) {
      setFormValues({
        ...formValues,
        image: `${uploadLink}/${file?.name}`,
      });
    }
  }, [file, uploadLink]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSpheronUpload = async () => {
    if (!file) {
      enqueueSnackbar('Please upload an image', {
        variant: 'error',
      });

      return;
    }

    try {
      setIsLoadingSpheron(true);
      const uploadResult = await upload([file], {
        token: data?.uploadToken,
      });

      setUploadLink(uploadResult.protocolLink);
      // setDynamicLink(uploadResult.dynamicLinks[0]);
    } catch (err) {
      alert(err);
    } finally {
      setIsLoadingSpheron(false);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      <form onSubmit={handleFinalSubmit}>
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
              <UploadAvatar onDrop={handleDrop} file={file} />
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
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Button
                  onClick={handleSpheronUpload}
                  variant="contained"
                  color="primary"
                  disabled={isLoading || error || !data || !file}
                  sx={{
                    minWidth: 200,
                    minHeight: 40,
                  }}
                >
                  Upload Image
                </Button>
                <Box
                  gap={1}
                  sx={{
                    m: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}
                >
                  <FormHelperText sx={{ fontWeight: 'bold', mt: 0 }}>
                    Powered by Spheron
                  </FormHelperText>
                  <img
                    src={'https://avatars.githubusercontent.com/u/70075140?s=200&v=4'}
                    width={24}
                    height={24}
                    style={{
                      borderRadius: '50%',
                    }}
                  />
                </Box>
              </Box>
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
              <Typography
                variant="h4"
                sx={{
                  m: 4,
                  textAlign: 'flex-start',
                  color: 'text.primary',
                }}
              >
                Advertisement Details
              </Typography>
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
              {uploadLink ? 'Submit' : 'Upload Image To Continue'}
            </Button>
          </Box>
        </Box>
      </form>
    </Container>
  );
}
