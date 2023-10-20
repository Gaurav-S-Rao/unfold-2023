import { m } from 'framer-motion';
import { Avatar, Chip, MenuItem } from '@mui/material';
import { Chain, useNetwork, useSwitchNetwork } from 'wagmi';

import { useCallback, useEffect } from 'react';
import { varHover } from 'src/components/animate';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from '../iconify';
import LoadingState from './loading-state';
import { enqueueSnackbar } from 'notistack';

export default function ChainSelector() {
  const popover = usePopover();

  const { chain } = useNetwork();
  const { chains, error, isLoading, switchNetwork, pendingChainId, switchNetworkAsync } =
    useSwitchNetwork();

  const handleLabelView = () => {
    if (isLoading) return 'Swithching';

    if (chain?.unsupported) return 'Select a chain';

    return chain?.name;
  };

  const handleChangeNetwork = useCallback(
    async (option: Chain) => {
      popover.onClose();
      switchNetworkAsync && switchNetworkAsync(option.id);
    },
    [popover]
  );

  useEffect(() => {
    const handleError = () => {
      if (isLoading) return;
      if (error) {
        enqueueSnackbar('Could Not Connect to wallet please try again...', { variant: 'error' });
      }
      return;
    };

    return () => {
      handleError();
    };
  }, [chain, pendingChainId]);

  return (
    <div>
      <Chip
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.001)}
        variant="soft"
        clickable
        disabled={isLoading ? true : false}
        label={handleLabelView()}
        avatar={
          isLoading ? (
            <LoadingState />
          ) : !chain || chain?.unsupported ? (
            <></>
          ) : (
            <Avatar alt="Eth logo" src={`/assets/chains/${chain?.name?.toLocaleLowerCase()}.png`} />
          )
        }
        onDelete={popover.onOpen}
        onClick={popover.onOpen}
        deleteIcon={
          !isLoading ? (
            <Iconify
              width={16}
              icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
              sx={{ ml: 0.5 }}
            />
          ) : (
            <></>
          )
        }
      />

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 240 }}>
        {chains.map((option) =>
          option.id === chain?.id
            ? null
            : switchNetwork && (
                <MenuItem
                  key={option.id}
                  selected={option.id === chain?.id}
                  onClick={async () => await handleChangeNetwork(option)}
                >
                  <Avatar
                    alt="Eth logo"
                    src={`/assets/chains/${option.name?.toLocaleLowerCase()}.png`}
                    sx={{ mr: 1.5, width: 28, height: 28 }}
                  />
                  {option.name}
                </MenuItem>
              )
        )}
      </CustomPopover>
    </div>
  );
}
