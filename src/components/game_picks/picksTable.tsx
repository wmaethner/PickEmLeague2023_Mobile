import moment from 'moment-timezone';
import { useEffect, useState } from 'react';
import { Pressable, PressableProps, Text, TouchableOpacity } from 'react-native';
import DraggableFlatList, { DragEndParams, RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';

import Ionicons from '@expo/vector-icons/Ionicons';
import { GamePickSchema, GameSchema } from '../../apis';
import { useGetGamePicks } from '../../hooks/game_picks/useGetGamePicks';
import { useUpdateGamePick } from '../../hooks/game_picks/useUpdateGamePick';
import { useUpdateGamePickOrder } from '../../hooks/game_picks/useUpdateGamePickOrder';
import { Blue, BlueGrey } from '../../utils/colors';
import { styles } from '../../utils/styles';
import Column from '../layouts/column';
import Row from '../layouts/row';

export interface PicksTableProps {
  userId: number;
  week: number;
  ignoreLocked: boolean;
}

export default function PicksTable(props: PicksTableProps) {
  const [picks, setPicks] = useState<GamePickSchema[]>([]);
  const [changed, setChanged] = useState(true);
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    // update every minute
    const interval = setInterval(() => setTime(Date.now()), 60000);
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  useEffect(() => {
    async function GetPicks() {
      setPicks(await useGetGamePicks(props.week, props.userId));
    }

    GetPicks();
    setChanged(false);
  }, [props.week, props.userId, changed])

  const handleTeamPick = async (id: number, home: boolean) => {
    let updatedPick = picks.find(pick => pick.id == id);
    updatedPick.pick = home ? 2 : 3;
    await useUpdateGamePick(updatedPick);
    setChanged(true);
  }

  const swap = (array: GamePickSchema[], i: number, j: number) => {
    const temp = array[j];
    array[j] = array[i];
    array[i] = temp;
    array[i].amount = array.length - i;
    array[j].amount = array.length - j;
  }

  const inRange = (index: number, from: number, to: number) => {
    return (index >= Math.min(from, to)) && (index <= Math.max(from, to));
  }

  const reorder = async (params: DragEndParams<GamePickSchema>) => {
    let lockedIndexes = [];
    params.data.forEach((pick, index) => {
      if (gameStarted(pick.game) && inRange(index, params.from, params.to)) {
        lockedIndexes.push(index);
      }
      pick.amount = picks.length - index;
    })

    if (!props.ignoreLocked) {
      const movedDown = params.from < params.to;

      // loop over locked rows and swap based on direction of move
      // if moved down then swap with previous index (opposites opposite)
      lockedIndexes.forEach(index => {
        swap(params.data, index, index + (movedDown ? 1 : -1));
      });
    }

    setPicks(params.data);

    useUpdateGamePickOrder(props.userId, props.week, params.data).then(() => {
      setChanged(true);
    });
  }

  const gameStarted = (game: GameSchema): boolean => {
    return moment() > moment.utc(game.gameTime);
  }

  const gameOver = (game: GameSchema): boolean => {
    return !(game.result == 1);
  }

  const disableRow = (game: GameSchema): boolean => {
    return gameStarted(game) && !props.ignoreLocked;
  }

  const correctPick = (gamePick: GamePickSchema): boolean => {
    return gameStarted(gamePick.game) && (gamePick.pick == gamePick.game.result);
  }

  const buttonProps = (pick: GamePickSchema, home: boolean): PressableProps => {
    const pickedTeam = home ? pick.pick == 2 : pick.pick == 3;
    const backgroundColor = disableRow(pick.game) ? (
      pickedTeam ? Blue.Blue900 : BlueGrey.BlueGrey400
    ) : (
      pickedTeam ? Blue.Blue700 : 'white'
    );
    const borderColor = correctPick(pick) ? 'green' : 'red';
    const borderWidth = (gameOver(pick.game) && pickedTeam) ? 3 : 0;
    return {
      disabled: disableRow(pick.game),
      style: [
        styles.button,
        styles.noPadding,
        {
          flex: 3,
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          borderWidth: borderWidth
        }
      ]
    }
  }

  const textColor = (gamePick: GamePickSchema) => {
    if (disableRow(gamePick.game)) {
      return 'lightgray';
    } else {
      return 'black';
    }
  }

  const icon = (gamePick: GamePickSchema) => (
    gameOver(gamePick.game) ?
      (correctPick(gamePick) ?
        <Ionicons name="md-checkmark-circle" size={32} color="green" /> :
        <Ionicons name="md-close-circle" size={32} color="red" />)
      : <></>
  )

  const renderItem = ({ item, drag, isActive }: RenderItemParams<GamePickSchema>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          activeOpacity={1}
          onLongPress={drag}
          disabled={isActive || disableRow(item.game)}
          style={[
            {
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'stretch',
              height: 40,
              margin: 1,
              backgroundColor: isActive ? Blue.Blue500 :
                disableRow(item.game) ? BlueGrey.BlueGrey800 : BlueGrey.BlueGrey100
            },
          ]}
        >
          <Row>
            <Text style={[styles.text, { flex: 1, color: textColor(item) }]}>{item.amount}</Text>
            <Pressable {...buttonProps(item, false)} onPress={e => handleTeamPick(item.id, false)}>
              <Text style={[styles.text, { color: textColor(item) }]}>{item.game.awayTeam.name}</Text>
            </Pressable>
            <Text style={[styles.text, { color: textColor(item) }]}>@</Text>
            <Pressable {...buttonProps(item, true)} onPress={e => handleTeamPick(item.id, true)}>
              <Text style={[styles.text, { color: textColor(item) }]}>{item.game.homeTeam.name}</Text>
            </Pressable>
            <Column>
              {icon(item)}
            </Column>
          </Row>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };


  return (
    <Row style={{ flex: 6 }}>
      <Column>
        <Row>
          <DraggableFlatList
            data={picks}
            onDragEnd={reorder}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            style={{ flex: 1 }}
            containerStyle={{ flex: 1, flexDirection: 'column', borderWidth: 2, padding: 0 }}
          />
        </Row>
      </Column>
    </Row>
  )
}